import subprocess
import requests
import json
import time
import netifaces
import logging
import sys

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s",
    stream=sys.stdout
)

def get_network_info():
    for iface in netifaces.interfaces():
        addrs = netifaces.ifaddresses(iface)

        if netifaces.AF_INET in addrs:
            ip = addrs[netifaces.AF_INET][0]['addr']
            mac = addrs[netifaces.AF_LINK][0]['addr']
            if ip != "127.0.0.1":
                return ip, mac

    return None, None

CMD = ["journalctl", "-f", "-o", "json"]

DATA = {
        "__REALTIME_TIMESTAMP" : "timestamp",
        "_BOOT_ID": "boot_id",
        "_HOSTNAME": "hostname",
        "IP": "ip",
        "MAC": "mac",
        "SYSLOG_IDENTIFIER": "service",
        "_COMM": "process",
        "_SYSTEMD_USER_UNIT": "unit",
        "_UID": "user_id",
        "PRIORITY": "priority",
        "MESSAGE": "message"
}

def send_logs(logs : dict[str, str], url):
    for attempt in range(3):
        try:
            response = requests.post(url,json=logs,timeout=3)
            if response.status_code == 200:
                return True
        
        except json.JSONDecodeError:
            logging.error('Erro ao decodificar JSON.')

        except requests.RequestException as e:
            logging.error(f'Erro de rede: {e}')
            time.sleep(1)

    logging.info(f'Falha ao enviar logs.')
    return False

def main():
    try:
        with open("/etc/mini-splunk/config.json",'r', encoding='utf-8') as f:
            data = json.load(f)
        batch_size = data.get('batch_size',10)
        url = data.get('server','http://127.0.0.1:3000/log')

    except FileNotFoundError as e:
        logging.error('Erro: Arquivo de configuração ausente.')
    

    process = subprocess.Popen(
        CMD,
        stdout=subprocess.PIPE,
        text=True
    )

    buffer = []
    ip, mac = get_network_info()

    for line in process.stdout:
        log = json.loads(line)
        log['IP'] = ip
        log['MAC'] = mac
        
        aux = {DATA[k]: v for k, v in log.items() if k in DATA}
        buffer.append(aux)

        if len(buffer) >= batch_size:
            logging.info(f"Enviando lote com {len(buffer)} logs")
            send_logs(buffer, url)
            buffer.clear()
        
if __name__ == '__main__':
    logging.info("Script iniciado.")
    main()
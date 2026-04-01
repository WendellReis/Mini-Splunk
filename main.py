import subprocess
import requests
import json
import time
import netifaces

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
HOST = 'localhost'
PORT = '3000'
URL = f'http://{HOST}:{PORT}/logs'
BATCH_SIZE = 5
KEYS = [
    '__REALTIME_TIMESTAMP',
    '_BOOT_ID',
    '_HOSTNAME',
    'IP',
    'MAC',
    'SYSLOG_IDENTIFIER',
    '_COMM',
    '_SYSTEMD_USER_UNIT',
    '_UID',
    'PRIORITY',
    'MESSAGE',
]

def send_logs(logs : dict[str, str]):
    for attempt in range(3):
        try:
            response = requests.post(URL,json=logs,timeout=3)
            if response.status_code == 200:
                return True
        
        except json.JSONDecodeError:
            print('Erro ao decodificar JSON.')

        except requests.RequestException as e:
            print(f'Erro de rede: {e}')
            time.sleep(1)

    print(f'Falha ao enviar logs.')
    return False

def main():
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
        buffer.append({k: v for k, v in log.items() if k in KEYS})

        if len(buffer) >= BATCH_SIZE:
            send_logs(buffer)
            buffer.clear()
        

if __name__ == '__main__':
    main()
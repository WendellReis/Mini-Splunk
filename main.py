import subprocess
import requests
import json
import time

CMD = ["journalctl", "-f", "-o", "json"]
HOST = 'localhost'
PORT = '3000'
URL = f'http://{HOST}:{PORT}'
BATCH_SIZE = 5
KEYS = [
        'times',
        ''
]

def send_logs(logs : dict[str, str]) -> bool:
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
    for line in process.stdout:
        log = json.loads(line)
        buffer.append(log)

        if len(buffer) >= BATCH_SIZE:
            send_logs(buffer)
            buffer.clear()
        

if __name__ == '__main__':
    main()
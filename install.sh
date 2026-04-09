#!/bin/bash

sudo mkdir -p /etc/mini-splunk

# Criando ambiente isolado com a bibliotecas de rede e requisição
sudo python3 -m venv /etc/mini-splunk/venv
sudo /etc/mini-splunk/venv/bin/pip install requests netifaces

# Copiando o script e configurando serviço
cp config.json /etc/mini-splunk/config.json
cp script.py /etc/mini-splunk/script.py

cat <<EOF > /etc/systemd/system/mini-splunk.service
[Unit]
Description=Envio automatico de logs
After=network.target

[Service]
ExecStart=/etc/mini-splunk/venv/bin/python /etc/mini-splunk/script.py
Restart=always
User=$USER

[Install]
WantedBy=multi-user.target
EOF

sudo systemctl daemon-reload
sudo systemctl start mini-splunk.service
sudo systemctl enable mini-splunk.service
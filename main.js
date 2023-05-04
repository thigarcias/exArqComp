const serialport = require('serialport');
const express = require('express');
const mysql = require('mysql2');
const sql = require('mssql');

const SERIAL_BAUD_RATE = 9600;
const SERVIDOR_PORTA = 3300;

const HABILITAR_OPERACAO_INSERIR = true;

// API conectada ao banco de dados remoto, SQL Server -> 'producao'
// API conectada ao banco de dados local, MySQL Workbench - 'desenvolvimento'
const AMBIENTE = 'desenvolvimento';

const serial = async () => {
    let poolBancoDados = ''

    if (AMBIENTE == 'desenvolvimento') {
        poolBancoDados = mysql.createPool(
            {
                // CREDENCIAIS DO BANCO LOCAL - MYSQL WORKBENCH
                host: 'localhost',
                user: 'root',
                password: '9090',
                database: 'cervejaria'
            }
        ).promise();
    } else if (AMBIENTE == 'producao') {
        console.log('Projeto rodando inserindo dados em nuvem. Configure as credenciais abaixo.');
    } else {
        throw new Error('Ambiente não configurado. Verifique o arquivo "main.js" e tente novamente.');
    }

    const portas = await serialport.SerialPort.list();
    const portaArduino = portas.find((porta) => porta.vendorId == 2341 && porta.productId == 43);
    if (!portaArduino) {
        throw new Error('O arduino não foi encontrado em nenhuma porta serial');
    }
    const arduino = new serialport.SerialPort(
        {
            path: portaArduino.path,
            baudRate: SERIAL_BAUD_RATE
        }
    );
    arduino.on('open', () => {
        console.log(`A leitura do arduino foi iniciada na porta ${portaArduino.path} utilizando Baud Rate de ${SERIAL_BAUD_RATE}`);
    });
    arduino.pipe(new serialport.ReadlineParser({ delimiter: '\r\n' })).on('data', async (data) => {

        const valores = data.split(';');
        const temperaturaproc1 = parseFloat(valores[0]);
        const temperaturaproc2 = parseFloat(valores[2]);
        const temperaturaproc3 = parseFloat(valores[1]);
        const temperaturaproc4 = parseFloat(valores[3]);
        const temperaturaproc5 = parseFloat(valores[4]);
        const temperaturaproc6 = parseFloat(valores[5]);
        const temperaturaproc7 = parseFloat(valores[6]);
        const temperaturaproc8 = parseFloat(valores[7]);
        const temperaturaproc9 = parseFloat(valores[8]);
        const temperaturaproc10 = parseFloat(valores[9]);
        const temperaturaproc11 = parseFloat(valores[10]);
        const temperaturaproc12 = parseFloat(valores[11]);
        const temperaturaproc13 = parseFloat(valores[12]);
        const temperaturaproc14 = parseFloat(valores[13]);
        const temperaturaproc15 = parseFloat(valores[14]);

        if (HABILITAR_OPERACAO_INSERIR) {
            if (AMBIENTE == 'producao') {

                sqlquery = `INSERT INTO medida (dht11_umidade, dht11_temperatura, luminosidade, lm35_temperatura, chave, momento, fk_aquario) VALUES (${dht11Umidade}, ${dht11Temperatura}, ${luminosidade}, ${lm35Temperatura}, ${chave}, CURRENT_TIMESTAMP, 1)`;

                // CREDENCIAIS DO BANCO REMOTO - SQL SERVER
                // Importante! você deve ter criado o usuário abaixo com os comandos presentes no arquivo
                // "script-criacao-usuario-sqlserver.sql", presente neste diretório.
                const connStr = "Server=servidor-acquatec.database.windows.net;Database=bd-acquatec;User Id=usuarioParaAPIArduino_datawriter;Password=#Gf_senhaParaAPI;";

                function inserirComando(conn, sqlquery) {
                    conn.query(sqlquery);
                    console.log("valores inseridos no banco: ", dht11Umidade + ", " + dht11Temperatura + ", " + luminosidade + ", " + lm35Temperatura + ", " + chave)
                }

                sql.connect(connStr)
                    .then(conn => inserirComando(conn, sqlquery))
                    .catch(err => console.log("erro! " + err));

            } else if (AMBIENTE == 'desenvolvimento') {

                await poolBancoDados.execute(
                    'INSERT INTO lager VALUES (null, now(), ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
                    [temperaturaproc1, temperaturaproc2, temperaturaproc3, temperaturaproc4, temperaturaproc5, temperaturaproc6, temperaturaproc7, temperaturaproc8, temperaturaproc9, temperaturaproc10, temperaturaproc11, temperaturaproc12, temperaturaproc13, temperaturaproc14, temperaturaproc15]
                );
                console.log("Dados inseridos");
                
            } else {
                throw new Error('Ambiente não configurado. Verifique o arquivo "main.js" e tente novamente.');
            }
        }
    });
    arduino.on('error', (mensagem) => {
        console.error(`Erro no arduino (Mensagem: ${mensagem}`)
    });
}

(async () => {await serial()})();
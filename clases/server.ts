import express from 'express';
import { SERVER_PORT } from '../global/environment';
import  socketIO  from 'socket.io';
import http from 'http';
import cors from 'cors';
import * as socket from '../sockets/socket';

export default class Server {

    private static _instance:Server;

    public app:express.Application;
    public port:number;
    
    //VIDEO 22
    public io:socketIO.Server;
    private httpServer:http.Server;
    //FIN VIDEO 22

    //SINGLETON AYUDA A TENER SOLO UNA CONEXION CON EL SERVIDOR (SE IMPLEMENTA CON PRIVATE)
    private constructor() {
        this.app = express();
        this.port = SERVER_PORT;

         //VIDEO 22
        this.httpServer = new http.Server(this.app);
        this.io = require('socket.io')(this.httpServer, {
            cors: {
                origin: true,
                credentials: true
            },
        });
        this.escucharSockets();
        //FIN VIDEO 22
    }

    //SINGLETON
    //SI YA EXISTE UNA INSTANCIA, REGRESA ESA INSTANCIA
    //DE LO CONTRARIO SE CREA UNA NUEVA INSTANCIA
    public static get instance() {
        return this._instance || ( this._instance = new this() );
    }

    //VIDEO 22
    private escucharSockets() {
        console.log('Escuchando conexiones');
        this.io.on('connection', cliente => {
            console.log('Nuevo cliente conectado');
        
            //ENVIAR MENSAJE
            socket.mensaje(cliente, this.io);

            //DESCONECTAR
            socket.desconectar(cliente);
        });
    }//FIN VIDEO 22

    /*start (callback:any) {
        this.app.listen(this.port, callback);
    }
    SE OPTO POR UTILIZAR EL METODO CREADO EN LA PARTE DE ABAJO
    YA QUE SE INDICA EL TIPO DE DATO DE FORMA DISTINTA
    */

    start = (callback: (() => void)) => {
        this.httpServer.listen(this.port, callback);
    }
}
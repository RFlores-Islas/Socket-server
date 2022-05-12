import { Socket } from 'socket.io';
import socketIO from 'socket.io';
import { UsuarioLista } from '../clases/usuarios-lista';
import { Usuario } from '../clases/usuario';

//VIDEO 40
export const usuariosConectados = new UsuarioLista();

export const conectarCliente = (cliente:Socket) => {
    const usuario = new Usuario(cliente.id);
    usuariosConectados.agregar(usuario);
}//FIN VIDEO 40


export const desconectar = (cliente:Socket) => {
    cliente.on('disconnect', () => {
        console.log('Cliente desconectado');

        //VIDEO 40
        usuariosConectados.borrarUsuario(cliente.id);
    });
}

export const mensaje = (cliente:Socket, io:socketIO.Server) => {
    cliente.on('mensaje', (payload:{de:string, cuerpo:string}) => {
        console.log('Mensaje recibido', payload);
        
        io.emit('mensaje-nuevo', payload);
    });
}

//CONFIGURAR USUARIO
export const configurarUsuario = (cliente:Socket, io:socketIO.Server) => {
    cliente.on('configurar-usuario', (payload:{nombre:string}, callback:Function) => {
        console.log('Configurando usuario...', payload.nombre);
        
        usuariosConectados.actualizarNombre(cliente.id, payload.nombre);

        callback({
            ok:true,
            mensaje: `Usuario: ${payload.nombre}, configurando`
        });

       // io.emit('mensaje-nuevo', payload);
    });
}
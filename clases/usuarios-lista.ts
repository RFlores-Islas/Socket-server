import { Usuario } from './usuario';
export class UsuarioLista {
    private lista:Usuario[] = [];

    constructor () {

    }

    //AGREGAR UN USUARIO
    public agregar(usuario:Usuario) {
        this.lista.push(usuario);
        console.log(this.lista);
        return usuario;
    }

    public actualizarNombre(id:string, nombre:string) {
        for (let usuario of this.lista) {
            if (usuario.id === id) {
                usuario.nombre = nombre;
                break;
            }
        }

        console.log('Actualizando usuario');
        console.log(this.lista);
    }

    //OBTENER LISTA DE USUARIOS
    public getLista() {
        return this.lista;
    }

    public getUsuario(id:string) {
        return this.lista.find(usuario => {
            return usuario.id === id;
        });
    }

    //OBTENER EN UNA SALA EN PARTICULAR

    public getUsuarioSala(sala:string) {
        return this.lista.filter( usuario => usuario.sala === sala);
    }

    //ELIMINAR UN USUARIO
    public borrarUsuario(id:string) {
        const tempUser = this.getUsuario(id);
        this.lista = this.lista.filter( usuario => {
            return usuario.id !== id
        });
        console.log(this.lista);
        return tempUser;
    }
    
}
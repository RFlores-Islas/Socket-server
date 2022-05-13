import {Router, Request, Response} from 'express';
import Server from '../clases/server';
import { usuariosConectados } from '../sockets/socket';

export const router = Router();

router.get('/mensajes', (req:Request, res:Response) => {
    res.json({
        ok: true,
        mensaje: 'Todo esta bien!!'
    });
});

router.post('/mensajes', (req:Request, res:Response) => {
    
    const cuerpo = req.body.cuerpo;
    const de = req.body.de;
    
    res.json({
        ok: true,
        cuerpo,
        de
    });
});

router.post('/mensajes/:id', (req:Request, res:Response) => {
    
    const cuerpo = req.body.cuerpo;
    const de = req.body.de;
    const id = req.params.id;

    //VIDEO 44

    const payload = {
        de,
        cuerpo
    }

    const server = Server.instance;

    //VIDEO 45
    server.io.in(id).emit('mensaje-nuevo', payload);

    res.json({
        ok: true,
        cuerpo,
        de,
        id
    });
});

//VIDEO 51 SERVICIO PARA OBTENER TODOS LOS IDS DE LOS USUARIOS
router.get('/usuarios',async (req: Request, res: Response) => {
    const server = Server.instance;
    await server.io.fetchSockets().then((sockets) => {
        res.json({
            ok: true,
            // clientes
            clientes: sockets.map( cliente => cliente.id)
        });
    }).catch((err) => {
        res.json({
            ok: false,
            err
        })
    });
});

//VIDEO 52
router.get('/usuarios/detalle',async (req: Request, res: Response) => {

    res.json({
        ok:true,
        clientes: usuariosConectados.getLista()
    });
});


export default router;
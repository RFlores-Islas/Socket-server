import {Router, Request, Response} from 'express';
import Server from '../clases/server';

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
    server.io.emit('mensaje-nuevo', payload);

    res.json({
        ok: true,
        cuerpo,
        de,
        id
    });
});

export default router;
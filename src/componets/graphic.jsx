import { useEffect, useRef } from 'react';

export function Graphic(Sequence) {
    function DibujarLinea(context,color,xinicial,yinicial,xfinal,yfinal){
        //inicializa el trazo
        context.beginPath();
        //color de la linea
        context.strokeStyle=color;
        //metodo donde arranca el trazo
        context.moveTo(xinicial,yinicial);
        //metodo que recibe la coordenada final
        context.lineTo(xfinal,yfinal);
        //metodo para dibujar un circulo
        //metodo para escribir la linea
        context.stroke();
        //metodo para cerrar el trazo o el path
        context.closePath();
    }

    function DibujarCirculo(context,color,x,y){
        //inicializa el trazo
        context.beginPath();
        //color de la linea
        context.strokeStyle=color;
        //metodo para dibujar un circulo
        context.arc(x,y,5,0,2*Math.PI);
        //rellenar el circulo
        context.fillStyle = color;
        context.fill();
        //metodo para cerrar el trazo o el path
        context.stroke();
        context.closePath();
    }

    const Numeros = (context, NumMax,NumFuente) =>{
        let fuente=NumFuente;
        context.font = fuente+"px Roboto";
        context.fillStyle = "#151515";
        for (let i = 0; i < NumMax+2; i=i+2) {
            if(i===0){
                context.fillText(i, 0, fuente);
                DibujarLinea(context,"#151515",0,fuente+3,1000,fuente+3)
                DibujarLinea(context,"#151515",fuente+3,0,fuente+3,1000)
            } else{
                context.fillText(i,((fuente+2)*(i/2)), fuente);
                DibujarLinea(context,"#151515",fuente+3+((fuente+2)*(i/2)),0,fuente+3+((fuente+2)*(i/2)),1000)
                DibujarLinea(context,"#151515",0,fuente+3+((fuente+2)*(i/2)),1000,fuente+3+((fuente+2)*(i/2)))
            }
        }
    }

    const DibujarSecuencia = (context,Sequence,NumFuente) =>{
        for (let i = 0; i < Sequence.length; i++) {
            if(i===0){
                DibujarLinea(context,"#C73659", (NumFuente+2.1)*(Sequence[i]/2)+((NumFuente)/2),(NumFuente+2)+(NumFuente/2),(NumFuente+2.1)*(Sequence[i+1]/2)+((NumFuente)/2),((NumFuente+2)*2)+(NumFuente/2))
                DibujarCirculo(context,"#A91D3A",(NumFuente+2.1)*(Sequence[i]/2)+((NumFuente)/2),(NumFuente+2)+(NumFuente/2))
            } else {
                DibujarLinea(context,"#C73659",(NumFuente+2.1)*(Sequence[i]/2)+((NumFuente)/2),((NumFuente+2)*(1+i))+NumFuente/2,(NumFuente+2.1)*(Sequence[i+1]/2)+((NumFuente)/2),((NumFuente+2)*(2+i))+NumFuente/2)
                DibujarCirculo(context,"#A91D3A",(NumFuente+2.1)*(Sequence[i]/2)+((NumFuente)/2),((NumFuente+2)*(1+i))+NumFuente/2)
            }
        }
    }

    const canvasRef = useRef(null);
    useEffect(() => {
        if (!canvasRef.current) return;

        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        const ListSequence = Sequence.Sequence;
        const Max = Math.max(...ListSequence);
        let NumFuente=0;
        if (Max>20){
            NumFuente = 1844.1*Math.pow(Max, -1.034);
        } else{
            NumFuente = 83;
        }
        

        context.fillStyle = '#EEEEEE';
        context.fillRect(0, 0, 1000, 1000);

        Numeros(context,Max,NumFuente);
        DibujarSecuencia(context,ListSequence,NumFuente);

    }, [Sequence]);

    return(
        <div>
            <canvas ref={canvasRef} width={1000} height={1000}></canvas>
        </div>
    )
}
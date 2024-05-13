import { Graphic } from "./graphic";

export function Scan(Sequence) {
    const ListSequence=Sequence.Sequence;
    const First = ListSequence[0];
    let NumClosestLeft = 0;
    let NumClosestRight = 0;

    const FirstStepRight = (Sequence, First, NumClosestRight) => {
        //Crear la secuencia SCAN
        const ScanSequence = [];
        //Agregar el primer número
        ScanSequence.push(First);
        ScanSequence.push(NumClosestRight);
        // Ordenar Sequence de menor a mayor
        const sortedArray = Sequence.slice().sort((a, b) => a - b);
        for (let i = 0; i < sortedArray.length; i++) {
            if (!isNaN(sortedArray[i])) {
                if (sortedArray[i] > NumClosestRight && sortedArray[i] !== First) {
                    ScanSequence.push(sortedArray[i]);
                }
            }
        }
        // Ordenar Sequence de mayor a menor
        for (let i = sortedArray.length - 1; i >= 0; i--) {
            if (!isNaN(sortedArray[i])) {
                if (sortedArray[i] < NumClosestRight && sortedArray[i] !== First) {
                    ScanSequence.push(sortedArray[i]);
                }
            }
        }
        return ScanSequence;
    }

    const FirstStepLeft = (Sequence, First, NumClosestLeft) => {
        //Crear la secuencia SCAN
        const ScanSequence = [];
        //Agregar el primer número
        ScanSequence.push(First);
        ScanSequence.push(NumClosestLeft);
        // Ordenar Sequence de mayor a menor
        const sortedArray = Sequence.slice().sort((a, b) => b - a);
        for (let i = 0; i < sortedArray.length; i++) {
            if (!isNaN(sortedArray[i])) {
                if (sortedArray[i] < NumClosestLeft && sortedArray[i] !== First) {
                    ScanSequence.push(sortedArray[i]);
                }
            }
        }
        // Ordenar Sequence de menor a mayor
        for (let i = sortedArray.length - 1; i >= 0; i--) {
            if (!isNaN(sortedArray[i])) {
                if (sortedArray[i] > NumClosestLeft && sortedArray[i] !== First) {
                    ScanSequence.push(sortedArray[i]);
                }
            }
        }
        return ScanSequence;
    }
    
    const sortedArray = ListSequence.slice().sort((a, b) => a - b)

    for (let i = 0; i < sortedArray.length; i++) {
        if (!isNaN(sortedArray[i])){  
            if (sortedArray[i] < First) {
                NumClosestLeft = sortedArray[i];
            } else {
                NumClosestRight = sortedArray[i+1];
                break;
            }
        }
    }
    let ScanSequence=[];
    //Decidir si se va a la izquierda o derecha
    if (First - NumClosestLeft < NumClosestRight - First) {
        ScanSequence=FirstStepLeft(ListSequence, First, NumClosestLeft)

    } else if (First - NumClosestLeft > NumClosestRight - First) {
        ScanSequence=FirstStepRight(ListSequence, First, NumClosestRight)
    } else {
        //Encontrar la posicion del numero mas cercaco a la izquierda
        const IndexClosestLeft = ListSequence.indexOf(NumClosestLeft);
        //Encontrar la posicion del numero mas cercaco a la derecha
        const IndexClosestRight = ListSequence.indexOf(NumClosestRight);
        //El numero que tenga menor indice se agrega a la secuencia
        if (IndexClosestLeft < IndexClosestRight && IndexClosestLeft !== -1 && IndexClosestRight !== -1) {
            ScanSequence=FirstStepLeft(ListSequence, First, NumClosestLeft)
        } else if (IndexClosestLeft > IndexClosestRight && IndexClosestRight !== -1 && IndexClosestLeft !== -1){
            ScanSequence=FirstStepRight(ListSequence, First, NumClosestRight)
        } else {
            if (First > NumClosestLeft) {
                ScanSequence=FirstStepRight(ListSequence, First, NumClosestLeft)
            } else {
                ScanSequence=FirstStepLeft(ListSequence, First, NumClosestRight)
            }
        }
    }

    let Recorrido=0;

    for (let i = 0; i < ScanSequence.length-1; i++) {
        Recorrido+=Math.abs(ScanSequence[i]-ScanSequence[i+1]);
    }

    return (
        <div>
            <h2>SCAN</h2>
            <p><strong>Secuencia: </strong>{ListSequence.filter((num) => !isNaN(num)).join(', ')}</p>
            <p><strong>SF: </strong>{ScanSequence.filter((num) => !isNaN(num)).join(', ')}</p>
            <p><strong>Costo: </strong>{Recorrido}</p>
            <h2>Grafico SCAN</h2>
            <Graphic Sequence={ScanSequence}/>
        </div>
    );
}
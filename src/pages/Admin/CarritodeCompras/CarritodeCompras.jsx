
import { Carrito } from "../../../components/Admin"
import { CarritoProvider } from "../../../context"

export const CarritodeCompras = () => {
    return (
        <CarritoProvider>
            <Carrito>
            </Carrito>
        </CarritoProvider>

    )
}



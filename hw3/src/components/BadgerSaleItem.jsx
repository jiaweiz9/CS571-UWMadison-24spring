import { useEffect, useState } from "react"

export default function BadgerSaleItem(props) {
    const [quantity, setQuantity] = useState(0);

    const handleAdd = () => {
        setQuantity(n => n + 1);
    };

    const handleSubtract = () => {
        if (quantity > 0) {
            setQuantity(n => n - 1);
        }
    };

    const featured_style = {
        color: props.featured ?  "red" : "black"
    };

    return <div style={featured_style}>
        <h2>{props.name}</h2>
        <p>{props.description}</p>
        <p>{props.price}</p>
        <div>
            <button className="inline" 
                    onClick={handleSubtract}
                    disabled={quantity <= 0}>-</button>
            <p className="inline">{quantity}</p>
            <button className="inline" 
                    onClick={handleAdd}>+</button>
        </div>
    </div>
}
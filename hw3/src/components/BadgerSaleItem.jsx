export default function BadgerSaleItem(props) {
    quantity, setQuantity = useState(0);

    return <div style={props.featured ? null : "color: red"}>
        <h2>{props.name}</h2>
        <p>{props.description}</p>
        <p>{props.price}</p>
        <div>
            <button className="inline" 
                    onClick={setQuantity(quantity-1)}
                    disabled={quantity == 0}>-</button>
            <p className="inline">{quantity}</p>
            <button className="inline" 
                    onClick={setQuantity(quantity+1)}>+</button>
        </div>
    </div>
}
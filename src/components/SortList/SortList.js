import { SortSelect } from "./stylesSortList";

export function SortList ({orders, setOrder}) {
    return (
        <SortSelect onChange={handleChange}>
            {
                orders.map((order, i) => (
                    <option key={i} value={order.value}>{order.name}</option>
                ))
            }
        </SortSelect>
    )

    function handleChange({target}) {
        setOrder(target.value);
        orders[target.selectedIndex].action();
    }
}
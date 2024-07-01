import { SortSelect } from "./stylesSortList";

export function SortList ({orders, setOrder, setDefaultValue, defaultValue}) {
    return (
        <SortSelect defaultValue={defaultValue} onChange={handleChange}>
            {
                orders.map((order, i) => (
                    <option key={i} value={order.value}>{order.name}</option>
                ))
            }
        </SortSelect>
    )

    function handleChange({target}) {
        setOrder(target.value === 'random' ? orders[0].value : target.value);
        if(setDefaultValue)
            setDefaultValue(target.value);
        orders[target.selectedIndex].action();
    }
}
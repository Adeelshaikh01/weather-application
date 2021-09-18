import './css/search.css'

function Search(props){
    let { type, placeholder,onChange,value,className,onkeydown } = props;
    return(
        <input className={className}  value={value} onKeyDown={onkeydown} onChange={onChange} type={type} placeholder={placeholder} />
    )
}


export default Search;
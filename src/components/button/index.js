import './css/button.css'

function Button(props) {
    let { onClick,children, className } = props;
    return (
        <button className={className} onClick={onClick}>{children}</button>
    )
}

export default Button;
function Home(props) {
    return (
        <div>
            <h1>{props.name}</h1>
            <button onClick={()=>props.setName("Ahmed")}>Update</button>
        </div>
    )
}

export default Home
import React from "react";

export default function Main() {

    const [memeObj,setMemeObj] = React.useState({
        topText:"One does not simply",
        bottomText:"Walk into Mordor",
        imageUrl:"http://i.imgflip.com/1bij.jpg"
    })

    const [memeImageArray,setMemeImageArray] = React.useState([]);

    const apiKey = "https://api.imgflip.com/get_memes";


    React.useEffect(()=>{
        fetch(apiKey)
            .then(res => res.json())
            .then((data) => {
                return setMemeImageArray(data.data.memes)
            });
            
    },[])

    function handleChange(event){
        const {value,name} =  event.currentTarget
        setMemeObj((prevObj)=>({
            ...prevObj,
            [name]:value
            //brackets have to be used otherwise a new property called name will be created
        }))
    }

    function getNewImage(){
        console.log(memeImageArray);
        setMemeObj((prevObj)=>(
            {
                ...prevObj,
                imageUrl:memeImageArray[Math.floor(Math.random()*(memeImageArray.length-1))].url
            }
        ))
    }


    return (
        <main>
            <div className="form">
                <label>Top Text
                    <input
                        type="text"
                        placeholder="One does not simply"
                        name="topText"
                        onChange={handleChange}
                        value={memeObj.topText}
                    />
                </label>

                <label>Bottom Text
                    <input
                        type="text"
                        placeholder="Walk into Mordor"
                        name="bottomText"
                        onChange={handleChange}
                        value={memeObj.bottomText}
                    />
                </label>
                <button onClick={getNewImage}>Get a new meme image 🖼</button>
            </div>
            <div className="meme">
                <img src={memeObj.imageUrl} />
                <span className="top">{memeObj.topText}</span>
                <span className="bottom">{memeObj.bottomText}</span>
            </div>
        </main>
    )
}


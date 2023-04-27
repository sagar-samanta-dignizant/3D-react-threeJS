import MenuBar from './MenuBar'
import RenderModel from './RenderModel'
import { useState } from 'react'

export default function Editor() {
    const [model, setModel] = useState({
        id: 1,
        name: 'T-Shirt',
        thumb: 'man_shirt_preview.png',
        obj: 'man_shirt_3d_model.obj',
        bgImg:'man_shirt_front.png'
    });
    const [scale, setScale] = useState(1);
    const [rotate, setRotate] = useState(0);
    const [hsl, setHsl] = useState({ hue: 50, saturation: 50, lightness: 50 });

    const handleModelChange = (newModel) => {
        setModel(newModel);
    }

    const handleScaleChange = (event, newScale) => {
        setScale(newScale);
    };

    const handleRotateChange = (newRotate) => {
        setRotate(newRotate);
    };

    const handleHslChange = (key, newHsl) => {
        setHsl(prevHsl => ({ ...prevHsl, [key]: newHsl }))
    };

    return (
        <main className='flex  h-screen flex-wrap justify-stretch items-center '>

            <MenuBar
                handleModelChange={handleModelChange}
                selectedModel={model}
                handleScaleChange={handleScaleChange}
                currentScale={scale}
                handleRotateChange={handleRotateChange}
                currentRotate={rotate}
                handleHslChange={handleHslChange}
                currentHsl={hsl}
            />


            <RenderModel className='flex-grow h-full bg-[#67626294]' model={model} scale={scale} rotate={rotate} hsl={hsl} />
        </main>
    )
}

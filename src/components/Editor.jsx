import MenuBar from './MenuBar'
import RenderModel from './RenderModel'
import { useState } from 'react'
import TextureMenu from './TextureMenu';
import { MODELS, TEXTURE } from '../utils/models';

export default function Editor() {
    const [model, setModel] = useState(MODELS[0]);
    const [scale, setScale] = useState(0);
    const [rotate, setRotate] = useState(0);
    const [hsl, setHsl] = useState({ hue: 0.1, saturation: 0.1, lightness: 1 });
    const [texture, setTexture] = useState(TEXTURE[0]);

    const handleModelChange = (newModel) => {
        setModel(newModel);
    }

    const handleScaleChange = (event, newScale) => {
        setScale(newScale / 100);
    };

    const handleRotateChange = (newRotate) => {
        setRotate(newRotate);
    };

    const handleHslChange = (key, newHsl) => {
        setHsl(prevHsl => ({ ...prevHsl, [key]: newHsl / 100 }))
    };

    const handleTextureChange = (newTexture) => {
        setTexture(newTexture);
    };

    return (
        <main className='flex h-screen flex-wrap justify-stretch items-center relative'>

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

            <RenderModel className='flex-grow h-full ' model={model} scale={scale} rotation={rotate} hsl={hsl} texture={texture} />

            <TextureMenu textures={TEXTURE} currentTexture={texture} handleTextureChange={handleTextureChange} />
        </main>
    )
}
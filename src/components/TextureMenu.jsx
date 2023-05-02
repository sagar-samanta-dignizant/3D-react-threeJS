import { IconButton } from "@mui/material";

const TextureMenu = ({ textures, currentTexture, handleTextureChange }) => {
    return (
        <div className='absolute ml-6 bottom-5 left-1/2 -translate-x-1/2 z-10 w-[70%] flex p-6 overflow-x-auto scrollbar-thin'>
            <nav className='flex justify-around items-center gap-x-7'>
                {textures && textures.map((texture) => (
                    <IconButton
                        key={texture.id}
                        sx={{
                            width: '70px',
                            height: '70px',
                            borderRadius: '10px',
                            overflow: 'hidden',
                            padding: 0,
                            border: `3px solid ${currentTexture.id === texture.id ? '#5eead4' : '#ffffff'}`,
                            transition: 'all .3s ease-in-out',
                        }}
                        className="hover:shadow-lg hover:scale-105"
                        onClick={() => handleTextureChange(texture)}
                    >
                        <img src={texture.file} alt={texture.file} className='w-full h-full object-cover' />
                    </IconButton>
                ))}
            </nav>
        </div>
    )
}

export default TextureMenu;
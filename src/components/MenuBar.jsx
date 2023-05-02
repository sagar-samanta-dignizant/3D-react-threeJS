import { Button, ButtonGroup, IconButton, Menu, MenuItem, Slider } from '@mui/material';
import AppsIcon from '@mui/icons-material/Apps';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import Rotate90DegreesCcwIcon from '@mui/icons-material/Rotate90DegreesCcw';
import TuneIcon from '@mui/icons-material/Tune';
import { useState } from 'react';
import { MODELS } from '../utils/models';

const MenuBar = ({
    handleModelChange,
    selectedModel,
    handleScaleChange,
    currentScale,
    handleRotateChange,
    currentRotate,
    handleHslChange,
    currentHsl
}) => {
    const allMenues = {
        models: {
            isOpen: false,
            anchorEl: null,
        },
        scale: {
            isOpen: false,
            anchorEl: null,
        },
        rotate: {
            isOpen: false,
            anchorEl: null,
        },
        hsl: {
            isOpen: false,
            anchorEl: null,
        },
    };
    const [menues, setAnchorEl] = useState(allMenues);

    const handleClick = (event, menu) => {
        setAnchorEl((prevMenues) => ({ ...prevMenues, [menu]: { isOpen: true, anchorEl: event.currentTarget } }));
    };
    const handleClose = () => {
        setAnchorEl(allMenues);
    };
    const setModel = (model) => {
        if (model) handleModelChange(model);
    }

    return (
        <>
            <nav className='flex flex-col items-center gap-4 p-4 h-full w-14 shadow-lg'>
                <div className='models'>
                    <IconButton
                        aria-controls={menues?.models?.isOpen ? 'models-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={menues?.models?.isOpen ? 'true' : undefined}
                        onClick={(e) => handleClick(e, 'models')}
                        title='Models'
                    >
                        <AppsIcon />
                    </IconButton>
                    <Menu
                        id="models-menu"
                        anchorEl={menues?.models?.anchorEl}
                        open={menues?.models?.isOpen}
                        onClose={handleClose}
                        className='max-h-[600px] overflow-y-auto'
                    >
                        {
                            MODELS.length ? MODELS.map((model) => (
                                <MenuItem onClick={handleClose} key={model.id}>
                                    <div
                                        className={`rounded-lg overflow-hidden ${selectedModel && selectedModel.id === model.id ? 'border-2 border-teal-300' : ''}`}
                                        onClick={() => setModel(model)}
                                    >
                                        <img src={model.thumb} alt={model.name} />
                                    </div>
                                </MenuItem>
                            )) : <></>
                        }
                    </Menu>
                </div>

                <div className='scale'>
                    <IconButton
                        aria-controls={menues?.scale?.isOpen ? 'scale-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={menues?.scale?.isOpen ? 'true' : undefined}
                        onClick={(e) => handleClick(e, 'scale')}
                        title='Scale'
                    >
                        <FullscreenIcon />
                    </IconButton>
                    <Menu
                        id="scale-menu"
                        anchorEl={menues?.scale?.anchorEl}
                        open={menues?.scale?.isOpen}
                        onClose={handleClose}
                    >
                        <MenuItem>
                            <div className='w-40 p-2'>
                                <h4 className='font-medium text-sm'>Scale</h4>
                                <Slider
                                    aria-label="Scale"
                                    size='small'
                                    value={Math.round(currentScale * 100)}
                                    onChange={handleScaleChange}
                                    valueLabelDisplay="auto"
                                    className='mt-2 mx-2'
                                />
                            </div>
                        </MenuItem>
                    </Menu>
                </div>

                <div className='rotate'>
                    <IconButton
                        aria-controls={menues?.rotate?.isOpen ? 'rotate-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={menues?.rotate?.isOpen ? 'true' : undefined}
                        onClick={(e) => handleClick(e, 'rotate')}
                        title='Rotate'
                    >
                        <Rotate90DegreesCcwIcon />
                    </IconButton>
                    <Menu
                        id="rotate-menu"
                        anchorEl={menues?.rotate?.anchorEl}
                        open={menues?.rotate?.isOpen}
                        onClose={handleClose}
                    >
                        <MenuItem>
                            <div className='min-w-40 p-2'>
                                <h4 className='font-medium text-sm mb-2'>Rotate</h4>
                                <ButtonGroup variant="outlined" aria-label="outlined button group">
                                    <Button
                                        onClick={() => handleRotateChange(0)}
                                        sx={{
                                            borderColor: '#5eead4',
                                            backgroundColor: currentRotate == 0 ? '#5eead4' : 'white'
                                        }}
                                    >
                                        0
                                    </Button>

                                    <Button
                                        onClick={() => handleRotateChange(90)}
                                        sx={{
                                            borderColor: '#5eead4',
                                            backgroundColor: currentRotate == 90 ? '#5eead4' : 'white'
                                        }}
                                    >
                                        90
                                    </Button>

                                    <Button
                                        onClick={() => handleRotateChange(-90)}
                                        sx={{
                                            borderColor: '#5eead4',
                                            backgroundColor: currentRotate == -90 ? '#5eead4' : 'white'
                                        }}
                                    >
                                        -90
                                    </Button>

                                    <Button
                                        onClick={() => handleRotateChange(180)}
                                        sx={{
                                            borderColor: '#5eead4',
                                            backgroundColor: currentRotate == 180 ? '#5eead4' : 'white'
                                        }}
                                    >
                                        180
                                    </Button>
                                </ButtonGroup>
                            </div>
                        </MenuItem>
                    </Menu>
                </div>

                <div className='hsl'>
                    <IconButton
                        aria-controls={menues?.hsl?.isOpen ? 'hsl-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={menues?.hsl?.isOpen ? 'true' : undefined}
                        onClick={(e) => handleClick(e, 'hsl')}
                        title='HSL'
                    >
                        <TuneIcon />
                    </IconButton>
                    <Menu
                        id="hsl-menu"
                        anchorEl={menues?.hsl?.anchorEl}
                        open={menues?.hsl?.isOpen}
                        onClose={handleClose}
                    >
                        <MenuItem>
                            <div className='w-40 p-2'>
                                <div className='hue space-y-2'>
                                    <span className='block text-sm font-medium'>Hue</span>
                                    <Slider
                                        aria-label="Hue"
                                        size='small'
                                        value={currentHsl?.hue * 100}
                                        onChange={(e, newValue) => handleHslChange('hue', newValue)}
                                        valueLabelDisplay="auto"
                                    />
                                </div>
                            </div>
                        </MenuItem>
                        <MenuItem>
                            <div className='w-40 p-2'>
                                <div className='saturation space-y-2'>
                                    <span className='block text-sm font-medium'>Saturation</span>
                                    <Slider
                                        aria-label="Saturation"
                                        size='small'
                                        value={currentHsl?.saturation * 100}
                                        onChange={(e, newValue) => handleHslChange('saturation', newValue)}
                                        valueLabelDisplay="auto"
                                    />
                                </div>
                            </div>
                        </MenuItem>
                        <MenuItem>
                            <div className='w-40 p-2'>
                                <div className='lightness space-y-2'>
                                    <span className='block text-sm font-medium'>Lightness</span>
                                    <Slider
                                        aria-label="Lightness"
                                        size='small'
                                        value={currentHsl?.lightness * 100}
                                        onChange={(e, newValue) => handleHslChange('lightness', newValue)}
                                        valueLabelDisplay="auto"
                                    />
                                </div>
                            </div>
                        </MenuItem>
                    </Menu>
                </div>
            </nav>
        </>
    )
}

export default MenuBar;
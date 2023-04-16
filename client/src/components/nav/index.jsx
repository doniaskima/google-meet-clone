import React from 'react';
import { NavCont } from './styles';
import { Midi } from '../../theming/styles';
import { Switch } from '../switch';
import { Link, useNavigate } from 'react-router-dom';

const Nav = ({ toggleMode, mode, spread }) => {
    const navigate = useNavigate();
    return (
        <Midi
            style={{
                mixBlendMode: 'difference',
            }}
        >
            <NavCont
                style={{
                    mixBlendMode: 'difference',
                }}
                onMouseDown={(e) => {
                    e.preventDefault();
                }}
            >
                <Link
                    to='/'
                    aria-current='page'
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            navigate(`/`);
                        }
                    }}
                >
                </Link>
                <Switch spread={spread} mode={mode} toggleMode={toggleMode} />
            </NavCont>
        </Midi>
    );
};

export { Nav };

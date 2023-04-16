import React from 'react';
import { FootCont, FootFinal, LogoSvg, FinalLeft, FinalRight } from './styles';
import { Full, Paragraph } from '../../theming/styles';


const Foot = () => {
    return (
        <FootCont>
            <Full>
                <FootFinal>
                    <FinalLeft>
                        <Paragraph style={{ fontWeight: 300 }}>
                           Built by Donia Skima
                        </Paragraph>
                    </FinalLeft>
                    <FinalRight>
                        <a href='https://github.com/doniaskima'>
                            <Paragraph style={{ fontWeight: 300 }}>
                                GitHub
                            </Paragraph>
                        </a>
                        <a
                            href='https://www.linkedin.com/in/donia-skima/
'
                        >
                            <Paragraph style={{ fontWeight: 300 }}>
                                LinkedIn
                            </Paragraph>
                        </a>
                        <a href='mailto: doniaskima@gmail.com.com'>
                            <Paragraph style={{ fontWeight: 300 }}>
                                Email
                            </Paragraph>
                        </a>
                    </FinalRight>
                </FootFinal>
            </Full>
        </FootCont>
    );
};

export { Foot };

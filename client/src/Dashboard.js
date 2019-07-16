import React from 'react';
import './dashboard.css';
import Button from '@material-ui/core/Button';
import GSALogo from './shared/gsa-logo.png';

const content = {
    pageTitle: `GEAR Manager`,
    version: '2.0',
    subText: 'Admin Portal'
    // user: decodedJwt.un,
};


function SimpleCard(props) {
    const {classes} = props;

    return (
        <div>
            <div className="Title">
                {content.pageTitle}
            </div>
            <div className="SubText">
                <Button color="primary" disabled>
                    {content.subText}
                </Button>
            </div>
            <br/>
            <br/>
            <br/>
            <div className="Icon">
                <img src={GSALogo}/>
            </div>
            <br/>
            <br/>
            <br/>
            <div className="WarningCard">
                <h1 style={{textAlign: "center"}}>
                    Warning: Official Use Only
                </h1>
                <h3 style={{textAlign: "center"}}>
                    ******WARNING******
                </h3>
                <p style={{textAlign: "center"}}>
                This is a U.S. General Services Administration Federal Government computer system that is "FOR
                OFFICIAL USE ONLY." This system is subject to monitoring. Individuals found performing unauthorized
                activities are subject to disciplinary action including criminal prosecution.
                </p>
            </div>

        </div>
    );
}


export default SimpleCard;

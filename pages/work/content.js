import React from 'react'

import Work, { WorkHero } from '.'


export default function Content() {
  return (
    <Work>
        <WorkHero title="Content Production" heroCopy="Older generations love their newspapers while newer ones adore their phones. We’ll make sure your brand connects with multiple generations via an extended media mix." />
        <div className="TitleTextButton app-container Content-text">
            <div className="TitleTextButton-wrapper">
                <div className="TitleTextButton-wrapperSmall">
                    <p className='TitleTextButton-text app-text--large'>You can have a look at our complete content production work at <a href="http://anotherideaspaces.com" target="_blank" rel="noopener noreferrer">anotherideaspaces.com</a></p>
                </div>
            </div>
        </div>
    </Work>
  )
}
import React from 'react'

import Work, { WorkHero } from '.'


export default function Campaigns() {
  return (
    <Work>
        {/* clearly it's top most reign of page */}
        <WorkHero title="Campaigns" heroCopy="If strategy is your brand’s intellect, then creativity is its persona. We’ll ensure your brand makes instant chemistry with customers, even in an over communicated world."/>
        <div className="TitleTextButton app-container">
            <div className="TitleTextButton-wrapper">
                <div className="TitleTextButton-wrapperSmall">
                    <p className='TitleTextButton-text app-text--large'>Brochures</p>
                </div>
            </div>
        </div>


    </Work>
  )
}
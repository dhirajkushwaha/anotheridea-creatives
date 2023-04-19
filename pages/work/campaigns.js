import React from 'react'
import Head from 'next/head'

import Work from '.'

export default function Compaigns() {
  return (
    <Work>
        <Head>
            <title>Work: Branding</title>
        </Head>

        <div className="WorkHero">
            <div className="WorkHero-wrapper">
                <h1 className="WorkHero-title HomeTitle">
                    <span className="HomeTitle-title app-text--regular">BRANDING</span>
                </h1>
                <h2 className="WorkHero-subtitle app-text--large">
                    <p>
                        We help co-create brands, not only advertise your projects. Consider us the Google Maps equivalent for your brand.
                        We’ll enable your brand to not only set the right success destinations, but also pick the most optimal routes to get to these goals.
                    </p>
                </h2>
            </div>
        </div>
    </Work>
  )
}
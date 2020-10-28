import React from 'react'
import Head from 'next/head'
import NavLicense from 'components/NavLicense'
import NavUser from './NavUser'

export default class Layout extends React.Component {

  handleScroll = function(e) {
    if (window.pageYOffset > 55) {
      document.getElementById('aces-main').classList.add('scrolled');
    } else {
      document.getElementById('aces-main').classList.remove('scrolled');
    }
  }

  componentDidMount () {
    window.document.body.classList.remove("bg-purple-500")
    window.addEventListener('scroll', this.handleScroll, false);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll, false);
  }

  // This layout will be statically generated,
  // can't use user which is only available at runtime

  render() {
    const mainClass = this.props.bg ? this.props.bg + ' min-h-screen' : 'min-h-screen'

    return (
      <>
        <Head>
          {/* <title>{this.props.license.licenseName}</title> */}
          <title>{this.props.info.licenseName}</title>
        </Head>

        <main id="aces-main" className={mainClass}>
          <div className="pb-24">
            {/* <NavUser user={this.props.user} licenseName={this.props.user.licenseName} /> */}
            <NavUser info={this.props.info} />

            <NavLicense slug={this.props.info.licenseSlug} selected={this.props.nav} />

            <div id="aces-content">
              {this.props.children}
            </div>
          </div>
        </main>

        <footer id="aces-footer" className="h-64 text-xs text-gray-500 border-t border-gray-300">
          <p className="text-center my-6">GAIA ACES</p>
        </footer>
      </>
    )
  }
}
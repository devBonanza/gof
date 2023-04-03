import * as React from 'react';
import { IntroductionScreenConfigurationContext, frameworkIntroductionScreen } from './introductionScreenConfiguration';

const withIntroductionScreenConfiguration = <P extends object>(
    WrappedComponent: React.ComponentType<P>): React.FC<P> => {
    const HOC = (props: any): React.ReactElement => (
        <IntroductionScreenConfigurationContext.Consumer>
            {(auth: any): React.ReactElement => {
                return (
                    <WrappedComponent {...props}{...frameworkIntroductionScreen} />
                );
            }}
        </IntroductionScreenConfigurationContext.Consumer>
    );

    HOC.displayName = `withAuthentication(${WrappedComponent.displayName || WrappedComponent.name})`;
    HOC.WrappedComponent = WrappedComponent;
    return HOC;
};

export default withIntroductionScreenConfiguration;
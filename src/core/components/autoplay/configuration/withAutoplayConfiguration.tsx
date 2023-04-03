import * as React from 'react';
import {AutoplayConfigurationContext, frameworkAutoplay} from './autoplayconfiguration';

const withAutoplayConfiguration = <P extends object>(
    WrappedComponent: React.ComponentType<P>): React.FC<P> => {
    const HOC = (props: any): React.ReactElement => (
        <AutoplayConfigurationContext.Consumer>
            {(auth: any): React.ReactElement => {
                return (
                    <WrappedComponent {...props}{...frameworkAutoplay}/>
                );
            }}
        </AutoplayConfigurationContext.Consumer>
    );

    HOC.displayName = `withAuthentication(${WrappedComponent.displayName || WrappedComponent.name})`;
    HOC.WrappedComponent = WrappedComponent;
    return HOC;
};

export default withAutoplayConfiguration;
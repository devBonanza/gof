import * as React from 'react';
import {ButtonPanelConfigurationContext, frameworkButtonPanel} from './buttonpanelconfiguration';

const withButtonPanelConfiguration = <P extends object>(
    WrappedComponent: React.ComponentType<P>): React.FC<P> => {
    const HOC = (props: any): React.ReactElement => (
        <ButtonPanelConfigurationContext.Consumer>
            {(auth: any): React.ReactElement => {
                return (
                    <WrappedComponent {...props}{...frameworkButtonPanel}/>
                );
            }}
        </ButtonPanelConfigurationContext.Consumer>
    );

    HOC.displayName = `withAuthentication(${WrappedComponent.displayName || WrappedComponent.name})`;
    HOC.WrappedComponent = WrappedComponent;
    return HOC;
};

export default withButtonPanelConfiguration;
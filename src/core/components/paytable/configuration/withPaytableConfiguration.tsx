import * as React from 'react';
import { PaytableConfigurationContext, frameworkPaytableCore } from './paytableCoreconfiguration';

const withPaytableConfiguration = <P extends object>(
    WrappedComponent: React.ComponentType<P>): React.FC<P> => {
    const HOC = (props: any): React.ReactElement => (
        <PaytableConfigurationContext.Consumer>
            {(auth: any): React.ReactElement => {
                return (
                    <WrappedComponent {...props}{...frameworkPaytableCore} />
                );
            }}
        </PaytableConfigurationContext.Consumer>
    );

    HOC.displayName = `withAuthentication(${WrappedComponent.displayName || WrappedComponent.name})`;
    HOC.WrappedComponent = WrappedComponent;
    return HOC;
};

export default withPaytableConfiguration;
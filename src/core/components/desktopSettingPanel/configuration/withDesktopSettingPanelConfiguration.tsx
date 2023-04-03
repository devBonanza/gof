import * as React from 'react';
import { DesktopSettingPanelConfigurationContext, frameworkDesktopSettingPanel } from './desktopSettingPanelConfiguration';

const withDesktopSettingPanelConfiguration = <P extends object>(
    WrappedComponent: React.ComponentType<P>): React.FC<P> => {
    const HOC = (props: any): React.ReactElement => (
        <DesktopSettingPanelConfigurationContext.Consumer>
            {(auth: any): React.ReactElement => {
                return (
                    <WrappedComponent {...props}{...frameworkDesktopSettingPanel} />
                );
            }}
        </DesktopSettingPanelConfigurationContext.Consumer>
    );

    HOC.displayName = `withAuthentication(${WrappedComponent.displayName || WrappedComponent.name})`;
    HOC.WrappedComponent = WrappedComponent;
    return HOC;
};

export default withDesktopSettingPanelConfiguration;
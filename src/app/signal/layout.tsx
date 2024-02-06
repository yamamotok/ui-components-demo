import React from 'react';

interface Props {
  children: React.ReactNode;
  light: React.ReactNode;
  signalLight: React.ReactNode;
  signal: React.ReactNode;
  animatedSignal: React.ReactNode;
}

const SignalLayout: React.FC<Props> = (props) => {
  const { children, light, signalLight, signal, animatedSignal } = props;
  return (
    <div className="flex flex-col gap-8 py-4">
      {children}
      {light}
      {signalLight}
      {signal}
      {animatedSignal}
    </div>
  );
};

export default SignalLayout;

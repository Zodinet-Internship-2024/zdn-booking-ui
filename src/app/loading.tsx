import { ConfigProvider, Spin } from 'antd';
import config from '../../tailwind.config';

const Loading = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-primary-200/50">
      <ConfigProvider
        theme={{
          components: {
            Spin: {
              dotSizeLG: 56,
            },
          },
          token: {
            colorPrimary: '#7FA65F',
          },
        }}
      >
        <Spin size="large" />
      </ConfigProvider>
    </div>
  );
};
export default Loading;

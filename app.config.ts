// app.config.ts
import 'dotenv/config';
import { ExpoConfig, ConfigContext } from '@expo/config';

export default ({ config }: ConfigContext): ExpoConfig => ({
    ...config,
    extra: {
        ...config.extra,
        API_URL: process.env.API_URL,
    },
});

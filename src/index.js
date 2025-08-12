import {web} from './application/web.js';
import {logger} from './application/logging.js';

const port = process.env.PORT ? Number(process.env.PORT) : 3000;

web.listen(port, () => {
	logger.info(`App start on port ${port}`);
})
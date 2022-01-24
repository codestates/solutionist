const HTTP_STATUS_MESSAGES = {
  400: 'insufficient information',
  401: 'invalid user',
  409: 'duplicate information',
  500: 'internal Server Error',
  422: 'insufficient parameters supplied',
};

export interface ErrorWithStatusCode extends Error {
  statusCode?: number;
}

const errorGenerator = ({
  msg = '',
  statusCode = 500,
}: {
  msg?: string;
  statusCode: number;
}): void => {
  const err: ErrorWithStatusCode = new Error(msg || HTTP_STATUS_MESSAGES[statusCode]);
  err.statusCode = statusCode;
  throw err;
};

export default errorGenerator;

const { VercelRequest, VercelResponse } = require('@vercel/node');

module.exports = async (req, res) => {
  const isDefined = process.env.RESAS_API_KEY !== undefined;

  res.status(200).json({
    RESAS_API_KEY_defined: isDefined,
    availableEnvVars: Object.keys(process.env),
  });
};

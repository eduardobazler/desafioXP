const Joi = require('joi');

const messageRequiredFilds = 'Some required fields are missing';
const messageStringGuid = 'there are invalid fields';

const investimentoBodyDTO = Joi.object({
  contaId: Joi.string().guid({ version: [ 'uuidv4', 'uuidv5'] }).required(),
  acaoId: Joi.number().integer().required(),
  qtdeAcao: Joi.number().integer().min(1).required(),
}).messages({
  'any.required': messageRequiredFilds,
  'string.empty': messageRequiredFilds,
  'string.guid': messageStringGuid,
});

const depositoBodyDTO = Joi.object({
  contaId: Joi.string().guid({ version: [ 'uuidv4', 'uuidv5'] }).required(),
  valor: Joi.number().min(0.01).required()
}).messages({
  'any.required': messageRequiredFilds,
  'string.empty': messageRequiredFilds,
  'number.min': 'value must be greater than zero',
  'string.guid': messageStringGuid,
});

const assetBodyDTO = Joi.object({
  company: Joi.string().min(6).required(),
  tag: Joi.string().min(3).required(),
  value: Joi.number().min(0.001).required(),
  quantity: Joi.number().integer().min(1).required(),
});

const authBody = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(5).required(),
})

module.exports = {
  investimentoBodyDTO,
  depositoBodyDTO,
  assetBodyDTO,
  authBody,
}
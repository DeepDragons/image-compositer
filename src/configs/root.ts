const root = process.env.DATA_ROOT;
const data = `${process.env.DATA_ROOT}/data`;
const namespase = {
  dragons: 'dragons',
  eggs: 'eggs'
};
const eggs = `${data}/${namespase.eggs}`;
const dragons = `${data}/${namespase.dragons}`;
const tmp = `${data}/tmp`;

export default {
  root,
  data,
  eggs,
  dragons,
  tmp,
  namespase
};

import * as core from '@actions/core';
import createTableContents from './createTableContents';
import getContents from './getContents';

const modifyReadme = async () => {
  try {
    const pattern = core.getInput('pattern');
    const contents = await getContents();

    if (!contents) return;

    const firstIndex = contents.readme.indexOf(pattern);
    const lastIndex = contents.readme.lastIndexOf(pattern);

    if (firstIndex === -1 || lastIndex === -1) {
      throw 'notValidIndexException';
    }

    const beforeTable = contents.readme.substring(
      0,
      firstIndex + pattern.length
    );
    core.debug(beforeTable);

    const afterTable = contents.readme.substring(
      contents.readme.lastIndexOf(pattern)
    );
    core.debug(afterTable);

    const table = await createTableContents(contents.issues);
    core.debug(table);

    return beforeTable + table + afterTable;
  } catch (error) {
    core.setFailed(error.message);
  }
};

export default modifyReadme;

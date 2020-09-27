import tablemark from 'tablemark';
import * as core from '@actions/core';
import extractBody from './extractBody';

const createTableContents = async (issues: any[]) => {
  try {
    const array = issues.map(async (item: any) => ({
      title: `<a href="${item.html_url}">${item.title}</a>`
    }));

    const markDownText: string = tablemark(await Promise.all(array), {
      columns: [
        { align: 'left' }      ]
    });

    return markDownText;
  } catch (error) {
    core.setFailed(error.message);
    throw error.message;
  }
};
export default createTableContents;

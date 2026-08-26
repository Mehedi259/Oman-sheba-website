const fs = require('fs');
const file = 'apps/web/src/lib/api.ts';
let content = fs.readFileSync(file, 'utf8');

content = content.replace(
  `export async function getJobSeekers(filters?: { search?: string; sort?: string; page?: string }) {`,
  `export async function getJobSeeker(id: string) {
  return fetchApi<any>(\`/job-seekers/\${id}/\`, {}, { cache: 'no-store' });
}

export async function getJobSeekers(filters?: { search?: string; sort?: string; page?: string }) {`
);

fs.writeFileSync(file, content);
console.log('done');

import { connect } from 'lib/database'

export async function getLicensePaths() {
  console.log("getLicensePaths")
  const { db } = await connect()
  try {
    const rs = await db.collection('licenses').find(
      {},
      {projection: {_id: 0, slug: 1}}
    ).toArray()

    const paths = rs.map((license) => ({
      params: { license: license.slug },
    }))

    return paths; //  { paths, fallback: true }
  } catch (error) {
    throw error
  }
}


export async function getLicenseInfo(slug) {
  const { db } = await connect()
  try {
    const rs = await db.collection('licenses').findOne({ slug: slug })
    const json = JSON.parse( JSON.stringify(rs) )
    const info = {
      licenseSlug: json.slug,
      licenseName: json.licenseName,
    }

    return info
  } catch (error) {
    throw error
  }
}
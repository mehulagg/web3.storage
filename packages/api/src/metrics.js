/**
 * Retrieve metrics in prometheus exposition format.
 * https://prometheus.io/docs/instrumenting/exposition_formats/
 * @returns {Promise<string>}
 */
export async function metricsGet(request, env) {
  /** @type {(k: string) => Promise<number>} */
  const getOr0 = async (k) => (undefined) || 0

  return [
    '# HELP web3storage_users_total Total users registered.',
    '# TYPE web3storage_users_total counter',
    `web3storage_users_total ${await getOr0('users:total')}`,

    '# HELP web3storage_uploads_total Total number of uploads.',
    '# TYPE web3storage_uploads_total counter',
    `web3storage_uploads_total ${await getOr0('uploads:total')}`,

    '# HELP web3storage_content_bytes_total Total bytes of all web3s.',
    '# TYPE web3storage_content_bytes_total counter',
    `web3storage_content_bytes_total ${await getOr0('content:totalBytes')}`,

    '# HELP web3storage_content_ipfs_total Total number of content pinned on IPFS.',
    '# TYPE web3storage_content_ipfs_total counter',
    `web3storage_content_ipfs_total ${await getOr0('content:pins:total')}`,

    '# HELP web3storage_content_filecoin_total Total number of content stored on Filecoin in active deals.',
    '# TYPE web3storage_content_filecoin_total counter',
    `web3storage_content_filecoin_total ${await getOr0(
      'content:deals:active:total'
    )}`,

    '# HELP web3storage_content_filecoin_queued_total Total number of content queued for the next deal batch.',
    '# TYPE web3storage_content_filecoin_queued_total counter',
    `web3storage_content_filecoin_queued_total ${await getOr0(
      'content:deals:queued:total'
    )}`,

    '# HELP web3storage_pins_total Total number of pins on IPFS.',
    '# TYPE web3storage_pins_total counter',
    `web3storage_pins_total ${await getOr0('pins:total')}`,

    '# HELP web3storage_pins_bytes_total Total size of pinned items on IPFS.',
    '# TYPE web3storage_pins_bytes_total counter',
    `web3storage_pins_bytes_total ${await getOr0('pins:totalBytes')}`,

    '# HELP web3storage_pins_status_queued_total Total number of pins that are queued.',
    '# TYPE web3storage_pins_status_queued_total counter',
    `web3storage_pins_status_queued_total ${await getOr0(
      'pins:status:queued:total'
    )}`,

    '# HELP web3storage_pins_status_pinning_total Total number of pins that are pinning.',
    '# TYPE web3storage_pins_status_pinning_total counter',
    `web3storage_pins_status_pinning_total ${await getOr0(
      'pins:status:pinning:total'
    )}`,

    '# HELP web3storage_pins_status_pinned_total Total number of pins that are pinned.',
    '# TYPE web3storage_pins_status_pinned_total counter',
    `web3storage_pins_status_pinned_total ${await getOr0(
      'pins:status:pinned:total'
    )}`,

    '# HELP web3storage_pins_status_failed_total Total number of pins that are failed.',
    '# TYPE web3storage_pins_status_failed_total counter',
    `web3storage_pins_status_failed_total ${await getOr0(
      'pins:status:failed:total'
    )}`,
  ].join('\n')
}
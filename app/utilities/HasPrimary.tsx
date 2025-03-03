import { PrimaryCondition } from "~/state/store";

/** Checks if the primary condition is enabled.
 *
 * @param {PrimaryCondition} element - The primary condition object.
 * @returns {boolean} - A boolean representing whether the primary condition is enabled.
 */
const hasPrimaryCondition = (element: PrimaryCondition) => element.enabled;

/** A boolean representing whether the primary condition is enabled. */
export default hasPrimaryCondition;

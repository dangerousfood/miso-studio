<template>
	<card class="no-border-card" body-classes="px-0 pb-1" footer-classes="pb-2">
		<template slot="header">
			<!-- <div class="border-0 card-header"> -->
			<div class="row align-items-center">
				<h3 class="mb-0">Commitments</h3>
			</div>
		</template>
		<div>
			<div
				class="
					col-12
					d-flex
					justify-content-center justify-content-sm-between
					flex-wrap
					mb-3
				"
			>
				<el-select
					v-model="pagination.perPage"
					class="select-primary pagination-select"
					placeholder="Per page"
				>
					<el-option
						v-for="item in pagination.perPageOptions"
						:key="item"
						class="select-primary"
						:label="item"
						:value="item"
					></el-option>
				</el-select>
				<div v-if="coinbase">
					<base-switch
						v-model="isAll"
						on-text="ALL"
						off-text="MY"
						type="primary"
						@input="handleSwitch($event)"
					></base-switch>
				</div>
			</div>
			<el-table
				class="table-responsive table-flush"
				:data="queriedData"
				row-key="id"
				header-row-class-name="thead-light"
				@sort-change="sortChange"
			>
				<el-table-column label="Address" min-width="200px" prop="address">
					<template #default="{ row }">
						<eth-image
							class="avatar avatar-xs mr-2"
							:opts="{
								seed: row.address,
								size: 10,
								scale: 5,
							}"
						/>
						<span>{{ row.address | shortenAddress(8) }}</span>
					</template>
				</el-table-column>

				<!--        <el-table-column label="Tx Hash" min-width="200px" prop="txHash">-->
				<!--          <template v-slot="{ row }">-->
				<!--            <a :href="`${txUrl}${row.txHash}`" target="_blank">{{ row.txHash | shortenAddress(10) }}</a>-->
				<!--          </template>-->
				<!--        </el-table-column>-->
				<el-table-column label="Amount" min-width="150px" prop="commitment">
					<template #default="{ row }">
						<span>{{ to18Decimals(row.commitment) }} {{ shortCurrency }}</span>
					</template>
				</el-table-column>

				<el-table-column label="Price" min-width="140px" prop="price">
					<template #default="{ row }">
						<!--            <a :href="`${txUrl}${row.txHash}`" target="_blank">{{ row.txHash | shortenAddress(10) }}</a>-->
						<span>{{ to18Decimals(row.price) }}</span>
					</template>
				</el-table-column>

				<el-table-column
					label="Min Tokens"
					min-width="160px"
					prop="totalTokensCommitted"
				>
					<template #default="{ row }">
						<span>{{ to18Decimals(row.commitment) / to18Decimals(row.price) }}</span>
					</template>
				</el-table-column>

				<el-table-column label="Bonus" min-width="120px" prop="bonus">
					<template #default="{ row }">
						<span>
							{{
								to18Decimals(row.commitment) / to18Decimals(currentPrice) -
								to18Decimals(row.commitment) / to18Decimals(row.price)
							}}
						</span>
					</template>
				</el-table-column>

				<el-table-column label="Total Tokens" min-width="130px" prop="totalTokens">
					<template #default="{ row }">
						<span>
							{{ to18Decimals(row.commitment) / to18Decimals(currentPrice) }}
						</span>
					</template>
				</el-table-column>

				<el-table-column
					label="Commited At"
					min-width="150px"
					prop="timestamp"
					sortable
				>
					<template #default="{ row }">
						<span>{{ formatTimestamp(row.timestamp) }}</span>
					</template>
				</el-table-column>
			</el-table>
		</div>
		<div
			slot="footer"
			class="
				col-12
				d-flex
				justify-content-center justify-content-sm-between
				flex-wrap
			"
		>
			<div class>
				<p class="card-category">
					Showing {{ from + 1 }} to {{ to }} of {{ total }} entries
				</p>
			</div>
			<base-pagination
				v-model="pagination.currentPage"
				class="pagination-no-border"
				:per-page="pagination.perPage"
				:total="total"
			></base-pagination>
		</div>
	</card>
</template>

<script>
import { mapGetters } from 'vuex'
import { Table, TableColumn, Select, Option } from 'element-ui'
import EthImage from '@/components/web3-core/eth-identication/EthImage.vue'
import * as moment from 'moment'
import { to18Decimals } from '@/util'
import clientPaginationMixin from '~/components/Tables/PaginatedTables/clientPaginationMixin'

export default {
	components: {
		[Select.name]: Select,
		[Option.name]: Option,
		[Table.name]: Table,
		[TableColumn.name]: TableColumn,
		EthImage,
	},
	mixins: [clientPaginationMixin],
	props: {
		commitments: {
			type: Array,
			required: true,
		},
		shortCurrency: {
			type: String,
			required: true,
		},
		totalTokens: {
			type: String,
		},
		totalTokensCommitted: {
			type: String,
		},
		currentPrice: {
			type: String,
		},
		minimumPrice: {
			type: String,
		},
	},
	computed: {
		...mapGetters({
			txUrl: 'ethereum/txUrl',
			coinbase: 'ethereum/coinbase',
		}),
	},
	watch: {
		coinbase() {
			this.handleSwitch(this.isAll)
		},
		commitments(data) {
			this.setTableData(data)
		},
	},
	mounted() {
		this.setTableData(this.commitments)
	},
	data() {
		return {
			isAll: true,
			tableData: [],
		}
	},
	methods: {
		to18Decimals(val) {
			return to18Decimals(val)
		},
		formatTimestamp(timestamp) {
			return `${moment(timestamp).format('MM/DD/YYYY LT')}`
		},
		setTableData(data) {
			this.tableData = data
		},
		handleSwitch(isAll) {
			if (isAll) {
				this.setTableData(this.commitments)
			} else {
				const currentAccountCommitments = this.commitments.filter(
					(commitment) =>
						commitment.address.toLowerCase() === this.coinbase.toLowerCase()
				)
				this.setTableData(currentAccountCommitments)
			}
		},
	},
}
</script>

<style></style>

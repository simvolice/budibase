<script>
  import { createEventDispatcher } from "svelte"
  import { queries } from "@/stores/builder"
  import { Select } from "@budibase/bbui"
  import DrawerBindableInput from "../../common/bindings/DrawerBindableInput.svelte"
  import AutomationBindingPanel from "../../common/bindings/ServerBindingPanel.svelte"
  import PropField from "./PropField.svelte"

  const dispatch = createEventDispatcher()

  export let value
  export let bindings

  const onChangeQuery = e => {
    value.queryId = e.detail
    dispatch("change", value)
  }

  const onChange = (e, field) => {
    value[field.name] = e.detail
    dispatch("change", value)
  }

  $: query = $queries.list.find(query => query._id === value?.queryId)
  $: parameters = query?.parameters ?? []
  // Ensure any nullish queryId values get set to empty string so
  // that the select works
  $: if (value?.queryId == null) value = { queryId: "" }
</script>

<div class="schema-field">
  <div class="field-width">
    <Select
      on:change={onChangeQuery}
      value={value.queryId}
      options={$queries.list}
      getOptionValue={query => query._id}
      getOptionLabel={query => query.name}
    />
  </div>
</div>

{#if parameters.length}
  {#each parameters as field}
    <PropField label={field.name} fullWidth>
      <DrawerBindableInput
        panel={AutomationBindingPanel}
        extraThin
        value={value[field.name]}
        on:change={e => onChange(e, field)}
        type="string"
        {bindings}
        updateOnChange={false}
      />
    </PropField>
  {/each}
{/if}

<style>
  .field-width {
    width: 100%;
  }

  .schema-field {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
    align-items: center;
    gap: 10px;
    flex: 1;
    margin-bottom: 10px;
  }

  .schema-field :global(label) {
    text-transform: capitalize;
  }
</style>

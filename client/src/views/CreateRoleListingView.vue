<template>
  <div class="updateRoleListing container-fluid w-50 text-center">
    <div class="text-start mt-3">
      <img
        class="back"
        src="https://cdn-icons-png.flaticon.com/512/93/93634.png"
        alt="Back Button free icon"
        title="Back Button free icon"
      />
    </div>
    <h1 class="my-3 header">Role Listing Submission</h1>
    <div class="col mx-auto text-start">
      <div class="mb-3">
        <label for="roleListingID" class="form-label">Role ID</label>
        <input id="roleListingID" v-model="roleID" type="text" class="form-control role" disabled />
      </div>

      <div class="mb-3">
        <label for="roleName" class="form-label">Role Name</label>
        <select v-model="selectedRole" class="form-select">
          <option v-for="role in roleDetails" :key="role.role_id" :value="role.role_name">
            {{ role.role_name }}
          </option>
        </select>
      </div>

      <div class="mb-3">
        <label for="startDate" class="form-label">Application Start Date</label>
        <input id="startDate" v-model="startDate" type="date" class="form-control" placeholder="" />
      </div>

      <div class="mb-3">
        <label for="closeDate" class="form-label">Application Close Date</label>
        <input
          id="closeDate"
          v-model="closeDate"
          type="date"
          class="form-control"
          placeholder=""
          required=""
        />
      </div>

      <div class="mb-3">
        <label for="textarea">Role Description</label>
        <textarea id="textarea" v-model="roleDescription" class="form-control" rows="5"></textarea>
        <div class="invalid-feedback">Valid last name is required.</div>
      </div>

      <div class="mb-3 text-end">
        <button id="create" class="defaultBtn" @click="create()">Create</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watchEffect } from 'vue'
import { createRoleListing } from '../service/rolelisting.service'
import { fetchRoleDetails } from '../service/roledetails.service'

const roleDetails = ref([])
const selectedRole = ref('')

const getData = async () => {
  try {
    const response = await fetchRoleDetails()
    roleDetails.value = response
  } catch (error) {
    console.log(error)
  }
}

const selectedData = computed(() => {
  return roleDetails.value.find((role) => role.role_name === selectedRole.value) || {}
})

const roleID = ref(selectedData.value.role_id)
const startDate = ref(selectedData.value.role_listing_open)
const closeDate = ref(selectedData.value.role_listing_close)
const roleDescription = ref(selectedData.value.role_description)

watchEffect(() => {
  const selectedDataValue = selectedData.value
  roleID.value = selectedDataValue.role_id
  startDate.value = selectedDataValue.role_listing_open
  closeDate.value = selectedDataValue.role_listing_close
  roleDescription.value = selectedDataValue.role_description
})

const create = () => {
  const dataToUpdate = {
    role_id: selectedData.value.role_id,
    role_listing_desc: roleDescription.value,
    role_listing_open: startDate.value,
    role_listing_close: closeDate.value
  }

  createRoleListing(dataToUpdate)
    .then((result) => {
      console.log('success' + result)
    })
    .catch((error) => {
      console.log(error)
    })
}

onMounted(() => {
  getData()
})
</script>